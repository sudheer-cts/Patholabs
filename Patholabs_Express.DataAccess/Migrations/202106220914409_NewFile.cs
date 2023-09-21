namespace Patholabs_Express.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewFile : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Appointment_Details", "FileName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Appointment_Details", "FileName");
        }
    }
}
