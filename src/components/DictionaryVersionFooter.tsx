import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const DICTIONARY_SETTINGS_ENDPOINT =
  '/api/v0/submission/_dictionary/_settings';

export interface DictionaryVersionFooterConfig {
  enabled?: boolean;
  label?: string;
  className?: string;
}

interface DictionarySettings {
  _dict_version?: unknown;
}

const findFooterLayout = (): HTMLElement | null =>
  document.querySelector<HTMLElement>('footer > div > div > div');

const DictionaryVersionFooter = ({
  enabled = false,
  label = 'Data Dictionary Version',
  className = 'mr-auto px-2 text-sm text-primary-contrast',
}: DictionaryVersionFooterConfig) => {
  const [footerLayout, setFooterLayout] = useState<HTMLElement | null>(null);
  const [dictionaryVersion, setDictionaryVersion] = useState<string>();

  useEffect(() => {
    if (!enabled) {
      setFooterLayout(null);
      return;
    }

    setFooterLayout(findFooterLayout());
  });

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const abortController = new AbortController();

    const loadDictionaryVersion = async () => {
      try {
        const response = await fetch(DICTIONARY_SETTINGS_ENDPOINT, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          return;
        }

        const settings = (await response.json()) as DictionarySettings;
        if (
          typeof settings._dict_version === 'string' &&
          settings._dict_version.trim().length > 0
        ) {
          setDictionaryVersion(settings._dict_version);
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          console.warn('Unable to load the data dictionary version', error);
        }
      }
    };

    void loadDictionaryVersion();

    return () => abortController.abort();
  }, [enabled]);

  if (!enabled || !footerLayout || !dictionaryVersion) {
    return null;
  }

  return createPortal(
    <p className={className} aria-live="polite">
      {label}: {dictionaryVersion}
    </p>,
    footerLayout,
  );
};

export default DictionaryVersionFooter;
