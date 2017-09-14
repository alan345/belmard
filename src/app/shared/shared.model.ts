export class Search {
  isQuoteAssignedToMe: boolean = false;
  orderBy: string = '';
  search: string = '';
  quoteType: string = '';
  quoteId: string = '';
  userId: string = '';
  assignedToId: string = '';
  projectId: string = '';
  isExternalUser: boolean = true;
};


export class PaginationData {
  currentPage: number = 1;
  itemsPerPage: number = 0;
  totalItems: number = 0;
};
