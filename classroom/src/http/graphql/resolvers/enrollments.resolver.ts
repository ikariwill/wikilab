import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@http/auth/authorization.guard';
import { Enrollment } from '@graphql/models/enrollment';
import { EnrollmentsService } from '@services/enrollments/enrollments.service';
import { CoursesService } from '@services/courses/courses.service';
import { StudentsService } from '@services/students/students.service';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Enrollment])
  enrollments() {
    return this.enrollmentsService.listAllEnrollments();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.courseId);
  }
}
