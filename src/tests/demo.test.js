import { render } from "@testing-library/react";
import Test from '../app/components/TestComponent/Test';

describe('Testing <Test />', () => {
    test('should render the text', () => {
        const string = 'Hello world!';

        const { getByText } = render( <Test text={string} /> );

        expect(getByText(string)).toBeInTheDocument();
    })
})