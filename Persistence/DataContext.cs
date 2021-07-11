using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<City> Cities { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<Nationality> Nationality { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Diagnosis> Diagnoses { get; set; }
        public DbSet<Department> Departments { get; set; }

        public DbSet<Pharmacy> Pharmacies { get; set; }
        public DbSet<BloodBank> BloodBanks { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Specialty> Specialty { get; set; }

        public DbSet<MedicalReport> MedicalReports { get; set; }
        public DbSet<Room> Rooms { get; set; }

         public DbSet<HealthData> HealthDatas { get; set; }

        public DbSet<Analyse> Analyses { get; set; }
         public DbSet<RegisterPatient> RegisterPatients { get; set; }

        public DbSet<PersonalInfo> PersonalInfo { get; set; }
        public DbSet<Vaccination> Vaccinations { get; set; }
        public DbSet<OtherVacc> OtherVaccs { get; set; }
        public DbSet<Photo> Photos { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Admin>();
            builder.Entity<Doctor>();
            builder.Entity<PatientUser>();
            builder.Entity<Diagnosis>();
            builder.Entity<Department>();
            builder.Entity<PersonalInfo>();
            builder.Entity<BloodBank>();
            builder.Entity<Analyse>();
            builder.Entity<Specialty>();
            builder.Entity<Room>();
            builder.Entity<HealthData>();
            // builder.Entity<Analyse>();

            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}