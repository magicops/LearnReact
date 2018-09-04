using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{
    public class Inspection
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public int RuleId { get; set; }
        public Rule Rule { get; set; }
        public int ProcedureId { get; set; }
        public Procedure Procedure { get; set; }
        public int ActionId { get; set; }
        public Action Action { get; set; }
    }
}
