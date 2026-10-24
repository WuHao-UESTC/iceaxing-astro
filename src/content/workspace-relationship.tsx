import { useCallback, useEffect, useMemo, useState } from 'react';
import { Combobox, Item } from '@keystar/ui/combobox';
import { Text } from '@keystar/ui/typography';
import { loadWorkspaceOptions, workspaceBranch } from '../lib/workspace-content-options';

type Props = {
  value: string | null;
  onChange(value: string | null): void;
  autoFocus: boolean;
  forceValidation: boolean;
  label: string;
  collection: string;
  description?: string;
  required?: boolean;
};
export function WorkspaceRelationship(props: Props) {
  const [options, setOptions] = useState<{ id: string; label: string }[]>([]);
  const [error, setError] = useState('');
  const [blurred, setBlurred] = useState(false);
  const [search, setSearch] = useState('');
  const branch = typeof window === 'undefined' ? '' : workspaceBranch(window.location.pathname);
  const load = useCallback(async () => {
    try {
      const tree = await loadWorkspaceOptions(branch);
      setOptions(
        tree.folders
          .filter((folder) => folder.editorCollection === props.collection)
          .map((folder) => ({ id: folder.id, label: folder.label })),
      );
      setError('');
    } catch (error) {
      setError(error instanceof Error ? error.message : '无法加载归属选项。');
    }
  }, [branch, props.collection]);
  useEffect(() => {
    void load();
  }, [load]);
  const items = useMemo(
    () =>
      props.value && !options.some((option) => option.id === props.value)
        ? [{ id: props.value, label: props.value }, ...options]
        : options,
    [options, props.value],
  );
  const selectedLabel = items.find((item) => item.id === props.value)?.label ?? props.value ?? '';
  const query =
    search === selectedLabel || search === props.value ? '' : search.trim().toLocaleLowerCase();
  const filtered = items.filter(
    (item) => !query || `${item.label} ${item.id}`.toLocaleLowerCase().includes(query),
  );
  return (
    <div data-ws-relationship={props.collection}>
      <Combobox
        label={props.label}
        description={props.description}
        value={props.value}
        onChange={(key) => props.onChange(typeof key === 'string' ? key : null)}
        onInputChange={setSearch}
        autoFocus={props.autoFocus}
        isRequired={props.required}
        items={filtered}
        onFocus={() => void load()}
        onBlur={() => setBlurred(true)}
        errorMessage={
          (props.forceValidation || blurred) && props.required && !props.value
            ? `请选择${props.label}。`
            : undefined
        }
        width="auto"
      >
        {(item) => (
          <Item key={item.id} textValue={item.label}>
            <Text>{item.label}</Text>
            <Text slot="description">{item.id}</Text>
          </Item>
        )}
      </Combobox>
      {props.value && <small data-ws-relationship-key>{props.value}</small>}
      {error && (
        <small role="status" data-ws-relationship-error>
          {error}
        </small>
      )}
    </div>
  );
}
