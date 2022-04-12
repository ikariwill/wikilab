import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { HttpModule } from '@http/http.module';
import { CoursesService } from '@services/courses/courses.service';
import { StudentsService } from '@services/students/students.service';
import { EnrollmentsService } from '@services/enrollments/enrollments.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [],
  providers: [CoursesService, StudentsService, EnrollmentsService],
})
export class AppModule {}
