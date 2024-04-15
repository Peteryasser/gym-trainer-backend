import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class CSVReaderService {
  async processCSVFile<T>(
    filePath: string,
    mapFn: (row: string[]) => T,
  ): Promise<T[]> {
    const csvFile = readFileSync(filePath);
    const csvFileString = csvFile.toString();

    const lines = csvFileString.split('\n');
    const data: T[] = [];

    for (const line of lines) {
      const fields = line.split(';'); // Adjust delimiter if needed
      const rowData = mapFn(fields);
      data.push(rowData);
    }

    return data;
  }
}
