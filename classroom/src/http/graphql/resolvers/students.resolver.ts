import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Student } from '@graphql/models/student';
import { StudentsService } from '@services/students/students.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@http/auth/authorization.guard';
import { EnrollmentsService } from '@services/enrollments/enrollments.service';
import { AuthUser, CurrentUser } from '@http/auth/current-user';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Student)
  me(@CurrentUser() user: AuthUser) {
    return this.studentsService.getStudentByAuthUserId(user.sub);
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => [Student])
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentsByStudentId(student.id);
  }
}
