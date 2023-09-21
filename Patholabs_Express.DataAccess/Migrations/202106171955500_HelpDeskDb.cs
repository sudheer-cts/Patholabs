﻿namespace Patholabs_Express.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class HelpDeskDb : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.HelpDesks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Email = c.String(),
                        Issue = c.String(maxLength: 300),
                        User_UserId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.User_UserId)
                .Index(t => t.User_UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.HelpDesks", "User_UserId", "dbo.Users");
            DropIndex("dbo.HelpDesks", new[] { "User_UserId" });
            DropTable("dbo.HelpDesks");
        }
    }
}
