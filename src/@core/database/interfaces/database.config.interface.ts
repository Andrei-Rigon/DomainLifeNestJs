// Aparentemente não é usado em lugar nenhum
export interface IDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: string;
  urlDatabase?: string;
  logging?: boolean;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
}
