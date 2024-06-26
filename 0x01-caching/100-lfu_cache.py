#!/usr/bin/env python3
"""LFU caching system module
"""

from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """LFUCache class that inherits from BaseCaching and is a caching system
    """

    def __init__(self):
        """Initiliaze
        """
        super().__init__()
        self.queue = []

    def put(self, key, item):
        """Add an item in the cache
        """
        if key and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                min_key = self.queue.pop(0)
                del self.cache_data[min_key]
                print("DISCARD: {}".format(min_key))
            self.queue.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """Get an item by key
        """
        if key in self.cache_data:
            self.queue.remove(key)
            self.queue.append(key)
            self.cache_data[key] += 1
            return self.cache_data[key]
        else:
            return None
