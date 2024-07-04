// export interface TEMPLATES {
//   name: string;
//   desc: string;
//   icon: string;
//   category: string;
//   slug: string;
//   aiPrompt: string;
//   form?: FORM;
// }
export interface TEMPLATES {
  name: string;
  desc: string;
  category: string;
  icon: string;
  aiPrompt: string;
  slug: string;
  form: Array<{
    label: string;
    field: string;
    name: string;
    required?: boolean;
  }>;
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}
