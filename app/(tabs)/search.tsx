import {View, Image, FlatList, ActivityIndicator, Text} from 'react-native'
import {images} from "@/constants/images";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/movieCard";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useEffect, useState} from "react";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
        refetch: loadMovies,
        reset,
    }  = useFetch(() => fetchMovies({ query: searchQuery}), true)

    useEffect(() => {
        const timeoutId = setTimeout(async  () => {
            if(searchQuery.trim()) {
                await loadMovies();
            } else {
                reset()
            }
        },500)
        return () => clearTimeout(timeoutId);
    },[searchQuery]);

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item}/>}
                keyExtractor={(item) => item.id.toString()}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20 items-center">
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>
                        <View className="my-5">
                            <SearchBar
                                placeholder="Nach Film suchen"
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                            />
                        </View>
                        {moviesLoading && (
                            <ActivityIndicator size="large" color="#0000ff" className="my-3" />
                        )}
                        {moviesError && (
                            <Text className="text-red-500 px-5 my-3">
                                Fehler beim Laden der Filme
                            </Text>
                        )}
                        {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                            <Text className="text-xl text-white font-bold">
                                Suchergebnisse für {' '}
                                <Text className="text-accent">{searchQuery}</Text>
                            </Text>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !moviesLoading && !moviesError ? (
                        <View className="mt-10 px-5 ">
                            <Text className="text-center text-white">
                                {searchQuery.trim() ? 'Keine Filme gefunden' : 'Nach Film suchen' }
                            </Text>
                        </View>
                    ): null
                }
            />
        </View>
    );
}

export default Search
