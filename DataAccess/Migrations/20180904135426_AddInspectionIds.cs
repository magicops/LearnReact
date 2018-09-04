using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class AddInspectionIds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inspections_Actions_ActionId",
                table: "Inspections");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspections_Departments_DepartmentId",
                table: "Inspections");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspections_Rules_RuleId",
                table: "Inspections");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspections_Stages_StageId",
                table: "Inspections");

            migrationBuilder.AlterColumn<int>(
                name: "StageId",
                table: "Inspections",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RuleId",
                table: "Inspections",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DepartmentId",
                table: "Inspections",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ActionId",
                table: "Inspections",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspections_Actions_ActionId",
                table: "Inspections",
                column: "ActionId",
                principalTable: "Actions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspections_Departments_DepartmentId",
                table: "Inspections",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspections_Rules_RuleId",
                table: "Inspections",
                column: "RuleId",
                principalTable: "Rules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspections_Stages_StageId",
                table: "Inspections",
                column: "StageId",
                principalTable: "Stages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inspections_Actions_ActionId",
                table: "Inspections");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspections_Departments_DepartmentId",
                table: "Inspections");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspections_Rules_RuleId",
                table: "Inspections");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspections_Stages_StageId",
                table: "Inspections");

            migrationBuilder.AlterColumn<int>(
                name: "StageId",
                table: "Inspections",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "RuleId",
                table: "Inspections",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "DepartmentId",
                table: "Inspections",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ActionId",
                table: "Inspections",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Inspections_Actions_ActionId",
                table: "Inspections",
                column: "ActionId",
                principalTable: "Actions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspections_Departments_DepartmentId",
                table: "Inspections",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspections_Rules_RuleId",
                table: "Inspections",
                column: "RuleId",
                principalTable: "Rules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspections_Stages_StageId",
                table: "Inspections",
                column: "StageId",
                principalTable: "Stages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
