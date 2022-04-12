import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Course } from './course';
import { Student } from './students';

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string;

  @Field(() => Student)
  student: Student;

  studentId: string;

  @Field(() => Course)
  course: Course;

  courseId: string;

  @Field(() => Date, { nullable: true })
  canceledAt: Date;

  @Field(() => Date)
  createdAt: Date;
}
