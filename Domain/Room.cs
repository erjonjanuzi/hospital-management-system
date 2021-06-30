using System;

namespace Domain
{
    public class Room
    {
        public Guid Id { get; set; }
        public int RoomNo { get; set; }
        public string RoomType { get; set; }
        public string Floor { get; set; }
        public string Department { get; set; }
        public string Patient { get; set; }
    }
}