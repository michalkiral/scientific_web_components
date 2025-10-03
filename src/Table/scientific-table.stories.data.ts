import {html} from 'lit';
import type {TableColumn, TableData} from './scientific-table';

export const sampleColumns: TableColumn[] = [
  {
    key: 'id',
    label: 'ID',
    type: 'number',
    width: '80px',
    align: 'center',
    sortable: true,
  },
  {
    key: 'compound',
    label: 'Compound Name',
    type: 'text',
    sortable: true,
    filterable: true,
  },
  {
    key: 'formula',
    label: 'Chemical Formula',
    type: 'text',
    sortable: true,
    filterable: true,
    align: 'center',
  },
  {
    key: 'molarMass',
    label: 'Molar Mass (g/mol)',
    type: 'number',
    sortable: true,
    align: 'right',
    formatter: (value: unknown) => `${Number(value).toFixed(2)} g/mol`,
  },
  {
    key: 'boilingPoint',
    label: 'Boiling Point (°C)',
    type: 'number',
    sortable: true,
    align: 'right',
    formatter: (value: unknown) => `${value}°C`,
  },
  {
    key: 'soluble',
    label: 'Water Soluble',
    type: 'boolean',
    align: 'center',
    sortable: true,
  },
  {
    key: 'discovered',
    label: 'Discovery Date',
    type: 'date',
    sortable: true,
    formatter: (value: unknown) => new Date(String(value)).getFullYear().toString(),
  },
];

export const sampleData: TableData[] = [
  {
    _id: '1',
    id: 1,
    compound: 'Water',
    formula: 'H2O',
    molarMass: 18.015,
    boilingPoint: 100,
    soluble: true,
    discovered: '1781-01-01',
  },
  {
    _id: '2',
    id: 2,
    compound: 'Sodium Chloride',
    formula: 'NaCl',
    molarMass: 58.44,
    boilingPoint: 1465,
    soluble: true,
    discovered: '1648-01-01',
  },
  {
    _id: '3',
    id: 3,
    compound: 'Carbon Dioxide',
    formula: 'CO2',
    molarMass: 44.01,
    boilingPoint: -78.5,
    soluble: true,
    discovered: '1640-01-01',
  },
  {
    _id: '4',
    id: 4,
    compound: 'Ethanol',
    formula: 'C2H6O',
    molarMass: 46.07,
    boilingPoint: 78.4,
    soluble: true,
    discovered: '1796-01-01',
  },
  {
    _id: '5',
    id: 5,
    compound: 'Benzene',
    formula: 'C6H6',
    molarMass: 78.11,
    boilingPoint: 80.1,
    soluble: false,
    discovered: '1825-01-01',
  },
  {
    _id: '6',
    id: 6,
    compound: 'Methane',
    formula: 'CH4',
    molarMass: 16.04,
    boilingPoint: -161.5,
    soluble: false,
    discovered: '1776-01-01',
  },
  {
    _id: '7',
    id: 7,
    compound: 'Ammonia',
    formula: 'NH3',
    molarMass: 17.03,
    boilingPoint: -33.3,
    soluble: true,
    discovered: '1774-01-01',
  },
  {
    _id: '8',
    id: 8,
    compound: 'Sulfuric Acid',
    formula: 'H2SO4',
    molarMass: 98.079,
    boilingPoint: 296.1,
    soluble: true,
    discovered: '1746-01-01',
  },
  {
    _id: '9',
    id: 9,
    compound: 'Acetone',
    formula: 'C3H6O',
    molarMass: 58.08,
    boilingPoint: 56,
    soluble: true,
    discovered: '1832-01-01',
  },
  {
    _id: '10',
    id: 10,
    compound: 'Calcium Carbonate',
    formula: 'CaCO3',
    molarMass: 100.09,
    boilingPoint: 825,
    soluble: false,
    discovered: '1630-01-01',
  },
];

export const minimalColumns: TableColumn[] = [
  {key: 'element', label: 'Element', type: 'text'},
  {key: 'symbol', label: 'Symbol', type: 'text', align: 'center'},
  {key: 'atomicNumber', label: 'Atomic #', type: 'number', align: 'center'},
];

export const minimalData: TableData[] = [
  {_id: '1', element: 'Hydrogen', symbol: 'H', atomicNumber: 1},
  {_id: '2', element: 'Helium', symbol: 'He', atomicNumber: 2},
  {_id: '3', element: 'Lithium', symbol: 'Li', atomicNumber: 3},
  {_id: '4', element: 'Beryllium', symbol: 'Be', atomicNumber: 4},
];

export const customFormattingColumns: TableColumn[] = [
  {
    key: 'id',
    label: 'ID',
    type: 'number',
    width: '60px',
    align: 'center',
  },
  {
    key: 'name',
    label: 'Compound Name',
    type: 'text',
    align: 'left',
  },
  {
    key: 'concentration',
    label: 'Concentration',
    type: 'number',
    align: 'right',
    formatter: (value: unknown) => `${Number(value).toFixed(3)} mol/L`,
  },
  {
    key: 'ph',
    label: 'pH Level',
    type: 'number',
    align: 'center',
    formatter: (value: unknown) => {
      const ph = Number(value);
      const color = ph < 7 ? 'red' : ph > 7 ? 'blue' : 'green';
      return html`<span style="color: ${color}; font-weight: bold;">${ph.toFixed(1)}</span>`;
    },
  },
  {
    key: 'temperature',
    label: 'Temperature',
    type: 'number',
    align: 'right',
    formatter: (value: unknown) => `${value}�C`,
  },
];

export const customFormattingData: TableData[] = [
  {
    _id: '1',
    id: 1,
    name: 'Hydrochloric Acid',
    concentration: 0.1,
    ph: 1.0,
    temperature: 25,
  },
  {
    _id: '2',
    id: 2,
    name: 'Pure Water',
    concentration: 55.6,
    ph: 7.0,
    temperature: 20,
  },
  {
    _id: '3',
    id: 3,
    name: 'Sodium Hydroxide',
    concentration: 0.1,
    ph: 13.0,
    temperature: 25,
  },
  {
    _id: '4',
    id: 4,
    name: 'Acetic Acid',
    concentration: 0.05,
    ph: 2.9,
    temperature: 22,
  },
  {
    _id: '5',
    id: 5,
    name: 'Buffer Solution',
    concentration: 0.2,
    ph: 7.4,
    temperature: 37,
  },
];

export const createLargeCompoundDataset = (count = 50): TableData[] =>
  Array.from({length: count}, (_, i) => ({
    _id: `${i + 1}`,
    id: i + 1,
    compound: `Compound ${i + 1}`,
    formula: `C${i}H${i + 1}O${Math.floor(i / 2)}`,
    molarMass: 50 + i * 2.5,
    boilingPoint: -100 + i * 10,
    soluble: i % 3 === 0,
    discovered: `${1800 + i}-01-01`,
  }));
