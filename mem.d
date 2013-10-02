#!/usr/sbin/dtrace -qs

syscall::mmap:entry
/pid == $target/
{
	self->sz = arg1;
}

syscall::mmap:return
/self->sz && arg1 == -1/
{
	printf("mmap failed for %d bytes, errno = %d\n", self->sz, errno);
	jstack(500,8000);
	self->sz = 0;
}

syscall::brk:entry
/pid == $target/
{
	self->new_end = arg0;
}

syscall::brk:return
/self->new_end && arg1 == -1/
{
	printf("brk failed at %x, errno = %d\n", self->new_end, errno);
	self->new_end = 0;
}

