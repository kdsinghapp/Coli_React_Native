if(NOT TARGET react-native-worklets-core::rnworklets)
add_library(react-native-worklets-core::rnworklets SHARED IMPORTED)
set_target_properties(react-native-worklets-core::rnworklets PROPERTIES
    IMPORTED_LOCATION "/Users/technorizen/Desktop/aman/september-2025/DainaApp/node_modules/react-native-worklets-core/android/build/intermediates/cxx/RelWithDebInfo/5j2l3hrk/obj/x86_64/librnworklets.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/technorizen/Desktop/aman/september-2025/DainaApp/node_modules/react-native-worklets-core/android/build/headers/rnworklets"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

