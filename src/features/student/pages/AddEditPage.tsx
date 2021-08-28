import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import apiStudent from 'api/apiStudent';
import { toastSuccess } from 'components/common';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

interface IUseParam {
  studentId: string;
}

function AddEditPage(): JSX.Element {
  const history = useHistory();

  const { studentId } = useParams<IUseParam>();
  const isModifyMode = Boolean(studentId); // nếu tồn tại studentId thì là chỉnh sửa ngược lại tạo mới

  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;
    //IFFE
    (async () => {
      try {
        const response: Student = await apiStudent.find(studentId);
        setStudent(response);
      } catch (error) {
        console.log('Error ', error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async (student: Student): Promise<void> => {
    // TODO:: handle here
    if (isModifyMode) {
      await apiStudent.update(student);
      toastSuccess('Update student success');
    } else {
      await apiStudent.add(student);
      toastSuccess('Create new student success');
    }

    history.push('/admin/student');
  };

  const initialValues: Student = {
    name: '',
    age: '',
    city: '',
    mark: '',
    gender: 'male',
    ...student, // trường hợp tạo mới student bị undefined nên khỏi bàn, còn th sửa thì nó có và sẽ được ghi đè lại các giá trị
  } as Student;

  return (
    <Box>
      <Link to={'/admin/student'}>
        <Typography variant={'caption'} style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to Students
        </Typography>
      </Link>
      <Typography variant={'h5'}>
        {isModifyMode ? 'Modify new student' : 'Add new student'}
      </Typography>
      {/* Trong trường hợp là tạo mới thì show lên luôn, còn sửa thì do call api nên khi call xong có dữ
      liệu thì mới show form */}
      {(!isModifyMode || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmitForm={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}

export default AddEditPage;
