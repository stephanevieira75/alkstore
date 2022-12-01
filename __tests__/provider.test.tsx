import React from 'react';
import { render } from '@testing-library/react';

import { FakeRootState, fakeStore } from '../constants';
import { AlkstoreProvider } from '../src';

const key = 'alkstore-provider';
describe(key, () => {
  it('should render', () => {
    const { getByTestId } = render(
      <AlkstoreProvider<FakeRootState> store={fakeStore}>
        <div data-testid={key} />
      </AlkstoreProvider>,
    );
    expect(getByTestId(key)).toBeTruthy();
  });

  it("should throw if store isn't provided", () => {
    const { getByTestId } = render(
      // @ts-ignore - we're testing the error case
      <AlkstoreProvider data-testid={key}>
        <div />
      </AlkstoreProvider>,
    );

    expect(() => getByTestId(key)).toThrowError();
  });

  it('should throw if store is not an alkstore instance', () => {
    const { getByTestId } = render(
      // @ts-ignore - we're testing the error case
      <AlkstoreProvider store={{}} data-testid={key}>
        <div />
      </AlkstoreProvider>,
    );

    expect(() => getByTestId(key)).toThrowError();
  });
});
