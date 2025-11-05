export interface CSVParseOptions {
  delimiter?: string;
  hasHeaders?: boolean;
  skipEmptyLines?: boolean;
}

export interface CSVParseResult {
  headers: string[];
  data: Record<string, string>[];
  rawData: string[][];
}

export async function parseCSVStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onProgress?: (data: Record<string, string>[], headers: string[]) => void,
  options: CSVParseOptions = {}
): Promise<CSVParseResult> {
  const {delimiter = ',', hasHeaders = true, skipEmptyLines = true} = options;

  const decoder = new TextDecoder();
  let partialChunk = '';
  let headers: string[] = [];
  const data: Record<string, string>[] = [];
  const rawData: string[][] = [];
  let isFirstLine = true;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const {value, done} = await reader.read();
    if (done) {
      break;
    }

    const text = decoder.decode(value, {stream: true});
    const lines = (partialChunk + text).split('\n');
    partialChunk = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (skipEmptyLines && !trimmed) {
        continue;
      }

      const row = trimmed.split(delimiter).map((cell) => cell.trim());
      rawData.push(row);

      if (isFirstLine && hasHeaders) {
        headers = row;
        isFirstLine = false;
      } else {
        const rowData: Record<string, string> = {_id: `row-${data.length}`};
        const currentHeaders =
          headers.length > 0 ? headers : row.map((_, i) => `Column ${i + 1}`);

        currentHeaders.forEach((header, colIndex) => {
          rowData[header] = row[colIndex] || '';
        });

        data.push(rowData);
        onProgress?.(data, headers);
      }
    }
  }

  if (partialChunk.trim()) {
    const row = partialChunk.split(delimiter).map((cell) => cell.trim());
    rawData.push(row);

    if (headers.length > 0) {
      const rowData: Record<string, string> = {_id: `row-${data.length}`};
      headers.forEach((header, colIndex) => {
        rowData[header] = row[colIndex] || '';
      });
      data.push(rowData);
    }
  }

  return {headers, data, rawData};
}
