namespace Patholabs_Express.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FeedbackDb : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Feedbacks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FeedBack = c.String(maxLength: 300),
                        AppointmentId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Appointment_Details", t => t.AppointmentId, cascadeDelete: true)
                .Index(t => t.AppointmentId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Feedbacks", "AppointmentId", "dbo.Appointment_Details");
            DropIndex("dbo.Feedbacks", new[] { "AppointmentId" });
            DropTable("dbo.Feedbacks");
        }
    }
}
