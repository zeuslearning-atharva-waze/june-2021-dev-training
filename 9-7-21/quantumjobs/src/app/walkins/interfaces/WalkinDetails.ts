export interface Slot {
  walk_in_id: number;
  date: string;
  walkin_slot_id: number;
  starttime: string;
  endtime: string;
  total: number;
}

export interface Instruction {
  walk_in_id: number;
  instruction: string;
  instruction_text: string;
  round_id?: number | null;
}

export interface Round {
  round_id: number;
  round_detail: string;
}

export interface ThingsToRemember {
  things_to_remember: string;
}
