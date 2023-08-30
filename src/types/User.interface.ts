export interface UserGet {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
}

export interface UserCreate {
  name: string;
  email: string;
  phone: string;
  position_id: string;
  photo: string;
}

export interface UserPosition {
  id: number;
  name: string;
}