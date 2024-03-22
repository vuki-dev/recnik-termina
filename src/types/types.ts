export type SelectProps = {
  options: any[];
  defOption?: any;
  value: any;
  className?: string;
  onChange: (e: any) => void;
};

export type TermType = {
  term: string,
  definition: string,
  relatedTerms: {term: string, id: number}[],
}

export type DeleteTermType = {
  id: string,
  term: string
}

export interface IFetchedTerms {
  current_page: number;
  data: any[];
  first_page_url: string;
  from: number | null;
  last_page: number | null;
  last_page_url: string;
  links: any[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number | null;
  total: number | null;
}

// Define a type for a single validation error
export interface ValidationError {
  path: string;
  message: string;
}

// Define a type for the validationErrors object
export interface ValidationErrors {
  inner?: ValidationError[];
  // You might need to extend this type based on the actual structure of your validationErrors object
  // For example, if there are other properties besides 'inner'
}

// Define a type for the setErrors function
export type SetErrorsFunction = (errors: Record<string, string>) => void;
