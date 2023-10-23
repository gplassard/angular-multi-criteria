import { Injectable } from '@angular/core';

export interface SearchResult {
  name: string;
}

@Injectable({
  providedIn: 'root',

})
export class SearchService {

  constructor() { }

  public async searchCriteria(index: number, criteria: string): Promise<SearchResult[]> {
    const delay = Math.random() * 5000;
    await this.sleep(delay);
    return [
      {name: `criteria-${index}-result-1-${criteria}`},
      {name: `criteria-${index}-result-2-${criteria}`},
      {name: `criteria-${index}-result-3-${criteria}`},
    ];
  }

  private sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), duration);
    });
  }
}
