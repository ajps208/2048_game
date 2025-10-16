// Functional programming utilities

export const range = (n) => [...Array(n).keys()];
export const transpose = (matrix) => matrix[0].map((_, i) => matrix.map(row => row[i]));
export const reverse = (arr) => [...arr].reverse();