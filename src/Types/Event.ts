export type Event = {
  id: number;
  sender: string;
  receiver: string;
  amount: number;
  external_id: string;
};
export const EventKeys: (keyof Event)[] = [
  "id",
  "sender",
  "receiver",
  "external_id",
  "amount",
];

export type EventPartitionMetaData = {
  [key in keyof Event]: { min: string | number; max: string | number };
};
