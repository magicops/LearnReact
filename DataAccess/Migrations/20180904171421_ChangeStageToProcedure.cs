using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class ChangeStageToProcedure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inspections_Stages_StageId",
                table: "Inspections");

            migrationBuilder.RenameColumn(
                name: "StageId",
                table: "Inspections",
                newName: "ProcedureId");

            migrationBuilder.RenameIndex(
                name: "IX_Inspections_StageId",
                table: "Inspections",
                newName: "IX_Inspections_ProcedureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inspections_Stages_ProcedureId",
                table: "Inspections",
                column: "ProcedureId",
                principalTable: "Stages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inspections_Stages_ProcedureId",
                table: "Inspections");

            migrationBuilder.RenameColumn(
                name: "ProcedureId",
                table: "Inspections",
                newName: "StageId");

            migrationBuilder.RenameIndex(
                name: "IX_Inspections_ProcedureId",
                table: "Inspections",
                newName: "IX_Inspections_StageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inspections_Stages_StageId",
                table: "Inspections",
                column: "StageId",
                principalTable: "Stages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
