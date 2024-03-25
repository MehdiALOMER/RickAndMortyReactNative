import { colors } from '@/constants';
import React, { useState, useCallback } from 'react';
import { Searchbar } from 'react-native-paper';

interface SearchBarProps {
    search: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const onChangeSearch = useCallback((query: string) => {
        setSearchQuery(query);
        search(query);
    }, [search]);

    return (
        <Searchbar
            placeholder="Ara"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{ backgroundColor: colors.primaryLight, borderRadius: 5 }}
            iconColor={colors.primary}
            theme={{ colors: { primary: colors.primary } }}
        />
    );
};

export default SearchBar;