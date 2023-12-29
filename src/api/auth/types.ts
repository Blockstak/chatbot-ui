type Profile = {
  credit: number;
  contact: string;
  address: string;
  profile_photo?: string | null;
};

export type LoginFormData = {
  username: string;
  password: string;
};

export type RegisterFormData = {
  email: string;
  username: string;
  password: string;
  profile?: Profile;
  last_name?: string;
  first_name?: string;
};

export type LoginRespose = { refresh: string; access: string };

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
  user: {
    username: string;
    email: string;
  };

  profile: Profile;
};
