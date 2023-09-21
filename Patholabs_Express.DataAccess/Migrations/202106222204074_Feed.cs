namespace Patholabs_Express.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Feed : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.HelpDesks", "User_UserId", "dbo.Users");
            DropIndex("dbo.HelpDesks", new[] { "User_UserId" });
            RenameColumn(table: "dbo.HelpDesks", name: "User_UserId", newName: "UserId");
            AlterColumn("dbo.HelpDesks", "UserId", c => c.Int(nullable: false));
            CreateIndex("dbo.HelpDesks", "UserId");
            AddForeignKey("dbo.HelpDesks", "UserId", "dbo.Users", "UserId", cascadeDelete: true);
            DropColumn("dbo.HelpDesks", "Email");
        }
        
        public override void Down()
        {
            AddColumn("dbo.HelpDesks", "Email", c => c.String());
            DropForeignKey("dbo.HelpDesks", "UserId", "dbo.Users");
            DropIndex("dbo.HelpDesks", new[] { "UserId" });
            AlterColumn("dbo.HelpDesks", "UserId", c => c.Int());
            RenameColumn(table: "dbo.HelpDesks", name: "UserId", newName: "User_UserId");
            CreateIndex("dbo.HelpDesks", "User_UserId");
            AddForeignKey("dbo.HelpDesks", "User_UserId", "dbo.Users", "UserId");
        }
    }
}
