import { mathTools } from '../data/categories/mathTools.js';
import { miscTools } from '../data/categories/miscTools.js';
import { healthTools } from '../data/categories/healthTools.js';
import { financeTools } from '../data/categories/financeTools.js';
import { statisticsTools } from '../data/categories/statisticsTools.js';
import { timeTools } from '../data/categories/timeTools.js';

const calculatorToolsList = [
  ...mathTools,
  ...miscTools,
  ...healthTools,
  ...financeTools,
  ...statisticsTools,
  ...timeTools
];

export default calculatorToolsList;