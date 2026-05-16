export interface Todo {
  created: string;
  id: number;
  isDone: boolean;
  title: string;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse {
  data: Todo[];
  info?: TodoInfo;
  meta: {
    totalAmount: number;
  };
}

export type TodoRequest = Partial<Omit<Todo, "created" | "id">>;

export interface TodoValidation {
  validation: {
    isValid: boolean;
    message: string;
  };
  validateTitle: (title: string) => boolean;
}

export type TodoFilter = "all" | "completed" | "inWork";
