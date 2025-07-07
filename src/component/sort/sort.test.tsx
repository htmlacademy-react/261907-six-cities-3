import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {datatype} from 'faker';
import {Sorting} from '../../const';
import Sort from './sort';

describe('Component: Sort', () => {
  const mockSorting = Sorting.PriceAsc;
  const mockOnSortingChange = vi.fn();
  const sortingToggleTestId = mockSorting;
  const sortingTypesListTestId = 'sorting-types-list';
  const activeSortingTestId = 'active-sorting';
  const sortingTestId = 'sorting';

  it('should render correctly', () => {
    render(<Sort sorting={mockSorting} onSortingChange={mockOnSortingChange} />);

    expect(screen.getByTestId(sortingToggleTestId)).toBeInTheDocument();
    expect(screen.getByTestId(sortingTypesListTestId)).toBeInTheDocument();
    expect(screen.getByTestId(sortingTypesListTestId)).not.toHaveClass('places__options--opened');
    expect(screen.getByTestId(activeSortingTestId)).toHaveClass('places__option--active');
    expect(screen.getAllByTestId(sortingTestId).length).toBe(3);
  });

  it('should open sorting list on click', async () => {
    render(<Sort sorting={mockSorting} onSortingChange={mockOnSortingChange} />);

    await userEvent.click(
      screen.getByTestId(sortingToggleTestId)
    );

    expect(screen.getByTestId(sortingTypesListTestId)).toHaveClass('places__options--opened');
  });

  it('should call onSortingChange on click', async () => {
    render(<Sort sorting={mockSorting} onSortingChange={mockOnSortingChange} />);

    await userEvent.click(
      screen.getAllByTestId(sortingTestId)[datatype.number(2)]
    );

    expect(mockOnSortingChange).toBeCalledTimes(1);
  });
});
