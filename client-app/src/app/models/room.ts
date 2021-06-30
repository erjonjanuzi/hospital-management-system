export interface Room {
    id: string;
    roomNo: string;
    roomType: string;
    floor: string;
    department:string;
    patient:string;
}

export interface RoomDto{
    roomNo: string;
    roomType: string;
    floor: string;
    department:string;
    patient:string;
}
