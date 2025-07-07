import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {datatype, lorem} from 'faker';
import {makeMockStore} from '../../utils/mocks';
import {withStore} from '../../utils/mock-component';
import CommentForm from './comment-form';

describe('Component: CommentForm', () => {
  it('should render correctly', () => {
    const commentFieldTestId = 'comment-field';
    const {withStoreComponent} = withStore(<CommentForm />, makeMockStore());

    render(withStoreComponent);

    expect(screen.getAllByRole('radio').length).toBe(5);
    expect(screen.getByTestId(commentFieldTestId)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('should render entered rating correctly', async () => {
    const mockRating = datatype.number({min: 1, max: 5});
    const starFieldTestId = `${mockRating}-stars-fields`;
    const {withStoreComponent} = withStore(<CommentForm />, makeMockStore());

    render(withStoreComponent);

    await userEvent.click(
      screen.getByTestId(starFieldTestId)
    );

    expect(screen.getByTestId(starFieldTestId)).toBeChecked();
  });

  it('should render entered comment correctly', async () => {
    const commentFieldTestId = 'comment-field';
    const mockComment = lorem.sentence();
    const {withStoreComponent} = withStore(<CommentForm />, makeMockStore());

    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId(commentFieldTestId),
      mockComment
    );

    expect(screen.getByDisplayValue(mockComment)).toBeInTheDocument();
  });
});
