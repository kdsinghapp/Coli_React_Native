if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/technorizen/.gradle/caches/8.12/transforms/1d0fb219786db76b2dae699cb7a75021/transformed/hermes-android-0.78.0-debug/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/technorizen/.gradle/caches/8.12/transforms/1d0fb219786db76b2dae699cb7a75021/transformed/hermes-android-0.78.0-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

