import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@http/auth/authorization.guard';
import { Course } from '@graphql/models/course';
import { CoursesService } from '@services/courses/courses.service';
import { CreateCourseInput } from '@graphql/inputs/create-course.input';
import { AuthUser, CurrentUser } from '@http/auth/current-user';
import { StudentsService } from '@services/students/students.service';
import { EnrollmentsService } from '@services/enrollments/enrollments.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Course])
  courses() {
    return this.coursesService.listAllCourses();
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => Course)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentsService.getStudentByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      studentId: student.id,
      courseId: id,
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.coursesService.getCourseById(id);
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Course)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data);
  }
}
