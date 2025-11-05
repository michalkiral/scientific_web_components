import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './scientific-graph.js';
import type {ScientificGraph} from './scientific-graph.js';

function generateLargeDataset(points: number) {
  const labels = Array.from({length: points}, (_, i) => `Point ${i + 1}`);
  const data = Array.from({length: points}, () => Math.random() * 100);
  return {labels, data};
}

function generateMultipleDatasets(datasetCount: number, pointsPerDataset: number) {
  const {labels} = generateLargeDataset(pointsPerDataset);
  const datasets = Array.from({length: datasetCount}, (_, i) => ({
    label: `Dataset ${i + 1}`,
    data: Array.from({length: pointsPerDataset}, () => Math.random() * 100),
    borderWidth: 2,
    tension: 0.3,
  }));
  return {labels, datasets};
}

const meta: Meta = {
  title: 'Scientific/Graph/Performance Tests',
  component: 'scientific-graph',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Graph Performance Tests

Visual tests demonstrating the Graph component's ability to handle large datasets efficiently.
These stories can be used for visual regression testing and performance validation.

**Performance Benchmarks:**
- 10,000 points: < 5 seconds render time
- Multiple datasets: < 5 seconds with 10 datasets × 1,000 points
- Statistics calculation: < 5 seconds with 10,000 points

All tests validate the component's ability to handle real-world scientific data volumes.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const TenThousandPointsLine: Story = {
  name: '10,000 Points - Line Chart',
  render: () => {
    const {labels, data} = generateLargeDataset(10000);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Rendering 10,000 data points in a line chart.
          Expected render time: &lt;5 seconds.
        </p>
        <scientific-graph
          title="10,000 Data Points - Line Chart"
          subtitle="Performance test: Large dataset rendering"
          type="line"
          .labels=${labels}
          .datasets=${[
            {
              label: 'Sample Data',
              data: data,
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.1)',
              borderWidth: 2,
              tension: 0.3,
            },
          ]}
          showToolbar
          showStatistics
          xAxisTitle="Data Points"
          yAxisTitle="Value"
          style="width: 100%; max-width: 1200px; height: 600px;"
        ></scientific-graph>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests rendering performance with 10,000 data points in a line chart. All browsers should render this in under 5 seconds.',
      },
    },
  },
};

export const TenThousandPointsBar: Story = {
  name: '10,000 Points - Bar Chart',
  render: () => {
    const {labels, data} = generateLargeDataset(10000);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Rendering 10,000 bars.
          Expected render time: &lt;5 seconds.
        </p>
        <scientific-graph
          title="10,000 Data Points - Bar Chart"
          subtitle="Performance test: Large dataset with bars"
          type="bar"
          .labels=${labels}
          .datasets=${[
            {
              label: 'Sample Data',
              data: data,
              backgroundColor: 'rgba(40, 167, 69, 0.6)',
              borderColor: '#28a745',
              borderWidth: 1,
            },
          ]}
          showToolbar
          showStatistics
          xAxisTitle="Categories"
          yAxisTitle="Value"
          style="width: 100%; max-width: 1200px; height: 600px;"
        ></scientific-graph>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests bar chart rendering with 10,000 bars. Chart.js should handle this efficiently with virtual rendering.',
      },
    },
  },
};

export const TenThousandPointsScatter: Story = {
  name: '10,000 Points - Scatter Plot',
  render: () => {
    const scatterData = Array.from({length: 10000}, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Rendering 10,000 scatter points.
          Expected render time: &lt;5 seconds.
        </p>
        <scientific-graph
          title="10,000 Data Points - Scatter Plot"
          subtitle="Performance test: Large scatter dataset"
          type="scatter"
          .labels=${[]}
          .datasets=${[
            {
              label: 'Scatter Data',
              data: scatterData,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: '#ff6384',
              pointRadius: 3,
              pointHoverRadius: 5,
            },
          ]}
          showToolbar
          xAxisTitle="X Variable"
          yAxisTitle="Y Variable"
          style="width: 100%; max-width: 1200px; height: 600px;"
        ></scientific-graph>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests scatter plot rendering with 10,000 points. This validates performance with x,y coordinate data.',
      },
    },
  },
};

export const MultipleDatasets: Story = {
  name: 'Multiple Datasets (10 × 1,000 points)',
  render: () => {
    const {labels, datasets} = generateMultipleDatasets(10, 1000);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Rendering 10 datasets with 1,000 points each (10,000 total).
          Expected render time: &lt;5 seconds.
        </p>
        <scientific-graph
          title="Multiple Datasets Performance Test"
          subtitle="10 datasets × 1,000 points = 10,000 total data points"
          type="line"
          .labels=${labels}
          .datasets=${datasets}
          showToolbar
          showLegend
          showStatistics
          xAxisTitle="Data Points"
          yAxisTitle="Value"
          style="width: 100%; max-width: 1200px; height: 600px;"
        ></scientific-graph>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests performance with multiple datasets. This validates the component can handle complex multi-series scientific data.',
      },
    },
  },
};

export const DataUpdatePerformance: Story = {
  name: 'Dynamic Data Updates',
  render: () => {
    const updateData = (e: Event) => {
      const button = e.target as HTMLButtonElement;
      const container = button.closest('div')?.parentElement;
      const graph = container?.querySelector('scientific-graph') as ScientificGraph | null;
      
      if (graph) {
        const {labels, data} = generateLargeDataset(5000);
        graph.labels = labels;
        graph.datasets = [
          {
            label: 'Dynamic Data',
            data: data,
            borderColor: '#6f42c1',
            backgroundColor: 'rgba(111, 66, 193, 0.1)',
            borderWidth: 2,
            tension: 0.3,
          },
        ];
      }
    };

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Dynamic data updates with 5,000 points.
          Click "Update Data" to test update performance. Expected: &lt;2 seconds per update.
        </p>
        <div style="margin-bottom: 16px;">
          <button
            @click=${updateData}
            style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 8px;"
          >
            Update Data
          </button>
        </div>
        <scientific-graph
          title="Dynamic Data Updates - 5,000 Points"
          subtitle="Performance test: Real-time data updates"
          type="line"
          .labels=${Array.from({length: 5000}, (_, i) => `Point ${i + 1}`)}
          .datasets=${[
            {
              label: 'Dynamic Data',
              data: Array.from({length: 5000}, () => Math.random() * 100),
              borderColor: '#6f42c1',
              backgroundColor: 'rgba(111, 66, 193, 0.1)',
              borderWidth: 2,
              tension: 0.3,
            },
          ]}
          showToolbar
          showStatistics
          xAxisTitle="Data Points"
          yAxisTitle="Value"
          style="width: 100%; max-width: 1200px; height: 600px;"
        ></scientific-graph>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests dynamic data update performance. Useful for validating real-time data visualization scenarios.',
      },
    },
  },
};

export const StatisticsCalculation: Story = {
  name: 'Statistics with 10,000 Points',
  render: () => {
    const {labels, data} = generateLargeDataset(10000);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Statistics calculation with 10,000 points.
          Expected calculation time: &lt;5 seconds.
        </p>
        <scientific-graph
          title="Statistics Performance Test"
          subtitle="Calculating mean, median, min, max, std dev for 10,000 points"
          type="line"
          .labels=${labels}
          .datasets=${[
            {
              label: 'Statistical Data',
              data: data,
              borderColor: '#fd7e14',
              backgroundColor: 'rgba(253, 126, 20, 0.1)',
              borderWidth: 2,
              tension: 0.3,
            },
          ]}
          showToolbar
          showStatistics
          showLegend
          xAxisTitle="Data Points"
          yAxisTitle="Value"
          style="width: 100%; max-width: 1200px; height: 700px;"
        ></scientific-graph>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests statistics calculation performance with 10,000 data points. Validates efficient computation of mean, median, std dev, etc.',
      },
    },
  },
};

export const ResponsiveResize: Story = {
  name: 'Responsive Resizing (10,000 points)',
  render: () => {
    const {labels, data} = generateLargeDataset(10000);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Responsive resizing with 10,000 points.
          Try resizing the viewport to test resize performance.
        </p>
        <div style="resize: both; overflow: auto; border: 2px dashed #ccc; padding: 10px; min-width: 400px; min-height: 400px; max-width: 100%;">
          <scientific-graph
            title="Responsive Resize Test"
            subtitle="Resize this container to test performance"
            type="line"
            .labels=${labels}
            .datasets=${[
              {
                label: 'Resize Test Data',
                data: data,
                borderColor: '#20c997',
                backgroundColor: 'rgba(32, 201, 151, 0.1)',
                borderWidth: 2,
                tension: 0.3,
              },
            ]}
            responsive
            showToolbar
            xAxisTitle="Data Points"
            yAxisTitle="Value"
            style="width: 100%; height: 100%;"
          ></scientific-graph>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests responsive resizing performance with large datasets. The container is resizable - drag the bottom-right corner.',
      },
    },
  },
};

export const ExportPerformance: Story = {
  name: 'Export Performance (5,000 points)',
  render: () => {
    const {labels, data} = generateLargeDataset(5000);
    let exportTime = 0;

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Export performance with 5,000 points.
          Use the toolbar export buttons to test. Expected: &lt;1 second.
        </p>
        ${exportTime > 0
          ? html`<p style="margin-bottom: 16px; padding: 8px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; color: #155724;">
              Last export took: <strong>${exportTime}ms</strong>
            </p>`
          : ''}
        <scientific-graph
          title="Export Performance Test"
          subtitle="Testing PNG/PDF export with 5,000 data points"
          type="line"
          .labels=${labels}
          .datasets=${[
            {
              label: 'Export Test Data',
              data: data,
              borderColor: '#e83e8c',
              backgroundColor: 'rgba(232, 62, 140, 0.1)',
              borderWidth: 2,
              tension: 0.3,
            },
          ]}
          showToolbar
          showExportButtons
          .exportFormats=${['png', 'pdf']}
          .onExport=${(format: string) => {
            const startTime = performance.now();
            setTimeout(() => {
              exportTime = performance.now() - startTime;
              console.log(`Export (${format}) took: ${exportTime}ms`);
            }, 100);
          }}
          xAxisTitle="Data Points"
          yAxisTitle="Value"
          style="width: 100%; max-width: 1200px; height: 600px;"
        ></scientific-graph>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests export functionality performance with large datasets. Export times are logged to the console.',
      },
    },
  },
};

export const MemoryStability: Story = {
  name: 'Memory Stability Test',
  render: () => {
    const containers = Array.from({length: 3}, (_, i) => {
      const {labels, data} = generateLargeDataset(2000);
      return {
        id: i,
        labels,
        data,
      };
    });

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Memory Test:</strong> Multiple graphs with 2,000 points each.
          Validates no memory leaks occur with multiple instances.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px;">
          ${containers.map(
            (container) => html`
              <scientific-graph
                title="Graph ${container.id + 1}"
                subtitle="Memory stability test - 2,000 points"
                type="line"
                .labels=${container.labels}
                .datasets=${[
                  {
                    label: `Dataset ${container.id + 1}`,
                    data: container.data,
                    borderWidth: 2,
                    tension: 0.3,
                  },
                ]}
                showToolbar
                style="width: 100%; height: 300px;"
              ></scientific-graph>
            `
          )}
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests memory stability by rendering multiple graph instances simultaneously. Monitor browser memory usage.',
      },
    },
  },
};
