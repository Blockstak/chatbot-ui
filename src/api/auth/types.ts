type Profile = {
  id?: number;
  user?: number;
  credit: number;
  contact: string;
  address: string;
  profile_photo?: string | null;
};

export type LoginFormData = {
  username: string;
  password: string;
};

export type UpdateNameFormData = {
  first_name: string;
  last_name: string;
};

export type UpdatePasswordFormData = {
  new_password: string;
  old_password: string;
};
export type UpdatePhotoFormData = any;

export type RegisterFormData = {
  email: string;
  username: string;
  password: string;
  profile?: Profile;
  last_name?: string;
  first_name?: string;
};

export type LoginResponse = { refresh: string; access: string };

export type RegisterResponse = {
  username: string;
  email: string;
};

export type VerifyTokenData = {
  token: string;
};

export type RefreshTokenData = {
  refresh: string;
};

export type RefreshTokenResponse = {
  access: string;
};

export type ProfileResponse = {
  email: string;
  username: string;
  profile: Profile;
  last_name: string;
  is_active: boolean;
  first_name: string;
};

export type UpdateNameResponse = {
  first_name: string;
  last_name: string;
};

export type UpdatePasswordResponse = {
  status: string;
};
export type UpdatePhotoResponse = {
  profile_photo: string;
};
