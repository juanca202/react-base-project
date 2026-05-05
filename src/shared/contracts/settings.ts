export type SettingsUser = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Settings = {
  user: SettingsUser;
};
