export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  email: string;
};

export type LogoutResponse = { message: string };
export type LoginRespose = { message: string; token: string };
