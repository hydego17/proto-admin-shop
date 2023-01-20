/* eslint-disable react/display-name */
import React, { isValidElement, useMemo, type ReactElement, type ReactNode } from 'react';
import { Table as MantineTable } from '@mantine/core';
import type { InferArrayElement } from '@/utils/types';

type UnknownArray = any[];

type TableComponent<T extends UnknownArray> = (
  props: React.ComponentProps<'div'> & {
    data?: T;
  }
) => JSX.Element;

type ItemProps<T extends UnknownArray> = {
  dataKey: keyof InferArrayElement<T>;
  label: ReactNode;
  width?: string;
  format?(v): any;
};

type TableItemComponent<T extends UnknownArray> = (props: { children?: ReactNode } & ItemProps<T>) => JSX.Element;

/**
 * Table component factory
 */
export const useCreateTable = <T extends UnknownArray>({
  data,
  status,
}: {
  data?: T;
  status?: 'error' | 'success' | 'loading';
}) => {
  // Create table item component
  const TableItem = useMemo<TableItemComponent<T>>(() => () => <></>, []);

  // Create table wrapper
  const TableComponent = useMemo<TableComponent<T>>(
    () =>
      ({ children, ...props }) => {
        // Acsess this component children and map them into our desired structured content
        const items = React.Children.toArray(children)
          .filter<ReactElement>(isValidElement)
          .filter((el) => el.type === TableItem)
          .map((c) => ({ ...c.props })) as ItemProps<T>[];

        return (
          <div className='table-container bg-white' {...props}>
            <MantineTable striped withBorder highlightOnHover withColumnBorders horizontalSpacing='md'>
              <thead>
                <tr>
                  {items.map((item) => (
                    <th key={item.dataKey as string} style={{ width: item.width }}>
                      {item.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {status === 'loading' &&
                  Array(10)
                    .fill(0)
                    .map((_, idx) => (
                      <tr key={idx} className='animate-show'>
                        <td className='animate-pulse' colSpan={items.length}>
                          <div className='bg-slate-200 h-6' />
                        </td>
                      </tr>
                    ))}
                {status === 'success' || data?.length ? (
                  data?.map((value, i) => {
                    return (
                      <tr key={value.id ?? i} className='animate-show'>
                        {items.map((item) => {
                          return (
                            <td key={item.dataKey as string} style={{ width: item.width }}>
                              {item.format ? item.format(value[item.dataKey]) : value[item.dataKey]}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr className='animate-show'>
                    <td colSpan={items.length}>
                      <div className='py-8 text-center text-slate-500'>No Product Found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </MantineTable>
          </div>
        );
      },
    [TableItem, data, status]
  );

  return [TableComponent, TableItem] as const;
};
