import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Room, RoomDto} from "../models/room";
import { store } from "./store";
import { toast } from "react-toastify";




export default class roomStore{
    roomRegistry = new Map<string, Room>();
    selectedRoom : Room | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this);
    }

    get rooms(){
        return Array.from(this.roomRegistry.values());
    }

    loadRooms = async() =>{
        try{
            const rooms = await agent.Rooms.list();
            rooms.forEach(room =>{
                this.setRoom(room);
            })
            this.loadingInitial = false;
        }catch (error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    loadRoom = async (id: string) =>{
        let room = this.getRoom(id);
        if(room){
            this.selectedRoom = room;
            return room;
        }else{
            this.loadingInitial = true;
        try{
            room = await agent.Rooms.details(id);
            this.setRoom(room);
            runInAction(()=>{
                this.selectedRoom = room;
            })
            this.setLoadingInitial(false);
            return room;
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
            }
        }
    }

    private setRoom =(room : Room) =>{
        this.roomRegistry.set(room.roomNo,room);
    }

    private getRoom =(id : string) =>{
        return this.roomRegistry.get(id);
    }

    setLoadingInitial = (state : boolean) =>{
        this.loadingInitial = state;
    }

    createRoom = async (room : RoomDto) =>{
        this.loading = true;
        try{
            await agent.Rooms.create(room);
            runInAction(()=>{
                this.loadRooms();
                store.modalStore.closeModal();
                toast.success('Room added successfully')
            })
        }catch(error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            }) 
        }
    }



    updateRoom = async (room : Room)=>{
        this.loading=true;
        try{
            await agent.Rooms.update(room);
            runInAction(()=>{
                this.loadRooms();
            })
            store.modalStore.closeModal();
        }catch(error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        } 
    }
   
         deleteRoom = async (id: string) => {
        this.loading = true;
        try {
            if (window.confirm('Are you sure you want to delete this record?')) {
                await agent.Rooms.delete(id);
                runInAction(() => {
                    this.roomRegistry.delete(id);
                    this.loading = false;
                    store.modalStore.closeModal();
                    toast.info('Room deleted successfully')
                    window.location.reload();
                    // toast.success("Diagnose Deleted Successfully", {
                    //     autoClose: 3000,
                    //     hideProgressBar: false,
                    // })
                })
                
            }
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }



   // deleteDepartment = async (id : string)=>{
       // this.loading=true;
       // try{
         //   await agent.Departments.delete(id);
          //  runInAction(()=>{
              //  this.departmentRegistry.delete(id);
              //  this.loading=false;
          //  })
      //  }catch(error){
          //  console.log(error);
          //  runInAction(()=>{
          //      this.loading=false;
          //  })
       // }
  //  }

}

