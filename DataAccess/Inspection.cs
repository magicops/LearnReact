using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{
    public class Inspection
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Department Department { get; set; }
        public Rule Rule { get; set; }
        public Stage Stage { get; set; }
        public Action Action { get; set; }
    }
}
