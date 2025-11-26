if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/technorizen/.gradle/caches/8.12/transforms/11805e4e191ace0e34065f3f1202a78a/transformed/hermes-android-0.78.0-release/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/technorizen/.gradle/caches/8.12/transforms/11805e4e191ace0e34065f3f1202a78a/transformed/hermes-android-0.78.0-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

