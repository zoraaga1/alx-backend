#!/usr/bin/env python3
"""100-lfu_cache module"""

from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """LFUCache class that inherits from BaseCaching and is a caching system
    """

    def __init__(self):
        """Initialize
        """
        super().__init__()
        self.frequency = {}
        self.min_freq = 0
        self.freq_keys = {}

    def put(self, key, item):
        """Add an item in the cache
        """
        if key and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # Find the least frequently used key
                lfu_keys = self.freq_keys[self.min_freq]
                lfu_key = lfu_keys.pop(0)
                if not lfu_keys:
                    del self.freq_keys[self.min_freq]
                del self.cache_data[lfu_key]
                del self.frequency[lfu_key]
                print("DISCARD: {}".format(lfu_key))

            self.cache_data[key] = item
            self.frequency[key] = 1
            self.min_freq = 1
            if 1 not in self.freq_keys:
                self.freq_keys[1] = []
            self.freq_keys[1].append(key)

    def get(self, key):
        """Get an item by key
        """
        if key not in self.cache_data:
            return None

        # Update the frequency
        freq = self.frequency[key]
        self.frequency[key] += 1
        self.freq_keys[freq].remove(key)
        if not self.freq_keys[freq]:
            del self.freq_keys[freq]
            if self.min_freq == freq:
                self.min_freq += 1

        if self.frequency[key] not in self.freq_keys:
            self.freq_keys[self.frequency[key]] = []
        self.freq_keys[self.frequency[key]].append(key)

        return self.cache_data[key]
