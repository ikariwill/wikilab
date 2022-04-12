import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@http/auth/authorization.guard';
import { Course } from '@graphql/models/course';
import { CoursesService } from '@services/courses/courses.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private coursesService: CoursesService) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Course])
  courses() {
    return this.coursesService.listAllCourses();
  }
}
