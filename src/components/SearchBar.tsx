import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search restaurants, cuisines...',
  onClear,
}) => {
  return (
    <View style={styles.searchContainer}>
      <Feather name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && onClear && (
        <Pressable onPress={onClear}>
          <Feather name="x" size={18} color="#94A3B8" style={styles.clearIcon} />
        </Pressable>
      )}
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  clearIcon: {
    marginLeft: 5,
  },
  searchInput: {
    flex: 1,
    color: '#1E293B',
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
})
